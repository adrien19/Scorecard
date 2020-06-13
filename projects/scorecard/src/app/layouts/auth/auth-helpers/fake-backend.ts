import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { Role } from '../auth-models/role';
import { SCORECARDS } from '../../../shared/fake-data.ts/scorecard.data';
import { User } from '../../../shared/models/user.model';
import { USERS } from '../../../shared/fake-data.ts/users.data';

const users: User[] = USERS;

let scorecards: any[] = SCORECARDS //.slice();

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body, params } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(100))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                case url.match(/\/users\/\d+$/) && method === 'GET':
                    return getUserById();
                case url.match('/users/byUsername') && method === 'GET':
                    return getUserByUsername();
                case url.endsWith('/scorecards/published') && method === 'GET':
                    return getPublishedScorecards();
                case url.endsWith('/all/scorecards') && method === 'GET':
                  return getAllScorecards();
                case url.endsWith('/scorecards/byId') && method === 'GET':
                  return getScorecardById();
                case url.endsWith('/users/myScorecards') && method === 'GET':
                  return getScorecardsCreateByUser();
                case url.endsWith('/scorecards/setPublishState') && method === 'POST':
                  return setPublishScorecardState();
                case url.endsWith('/scorecards/edit/scorecard/team') && method === 'POST':
                  return editScorecardProjectTeam();
                case url.endsWith('/scorecards/edit/scorecard/goal') && method === 'POST':
                  return modifyScorecardProjectGoal();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }

        }

        // route functions

        function authenticate() {
          // const { username.input, password.input } = body;
          const username = body.username.input;
          const password =body.password.input;

          const user = users.find(x => {
              return x.username === username && x.password === password;
          });
          if (!user) return error('Username or password is incorrect');
          return ok({
            userId: user.userId,
            username: user.username,
            firstName: user.userFirstName,
            lastName: user.userLastName,
            userEmail: user.userEmail,
            userfullName: user.userfullName,
            role: user.role,
            token: `fake-jwt-token.${user.userId}`
          });
        }

        function getUsers() {
            if (!isAdmin()) return unauthorized();
            return ok(users);
        }

        function getUserByUsername() {
            if (!isLoggedIn()) return unauthorized();

            // only admins can access other user records
            if (!isAdmin()) return unauthorized();

            const username = params.get('username');
            const selectedUser = users.filter(x => x.username.indexOf(username) !== -1).map(user => {
              return {
                userId: user.userId,
                userfullName: user.userfullName,
                userEmail: user.userEmail
              }
            });
            return ok(selectedUser);
        }

        function getUserById() {
          if (!isLoggedIn()) return unauthorized();

          // only admins can access other user records
          if (!isAdmin()) return unauthorized();

          const user = users.find(x => x.username === idFromUrl());
          const userData = {
            userId: user.userId,
            userfullName: user.userfullName,
            userEmail: user.userEmail
          }
          return ok(userData);
      }

        // helper functions

        function ok(body) {
            return of(new HttpResponse({ status: 200, body }));
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'unauthorized' } });
        }

        function error(message) {
            return throwError({ status: 400, error: { message } });
        }

        function isLoggedIn() {
            const authHeader = headers.get('Authorization') || '';
            return authHeader.startsWith('Bearer fake-jwt-token');
        }

        function isAdmin() {
            return isLoggedIn() && currentUser().role === Role.Admin;
        }

        function currentUser() {
            if (!isLoggedIn()) return;
            const id = headers.get('Authorization').split('.')[1];

            return users.find(x => x.userId === id);
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return urlParts[urlParts.length - 1];
        }

        // ENDPOINTS FOR SCORECARDS //
        function getPublishedScorecards() {
          if (!isLoggedIn()) return unauthorized();

          const publishedCards = scorecards.filter(scorecard => scorecard.published && scorecard.published === true);
          return ok(publishedCards);
        }

        function getAllScorecards() {
          if (!isLoggedIn()) return unauthorized();

          // only admins can access all scorecards records
          if (!isAdmin() && currentUser().userId !== idFromUrl()) return unauthorized();
          return ok(scorecards);
        }

        function getScorecardById() {
          if (!isLoggedIn()) return unauthorized();

          const scorecardId = params.get('scorecardId');
          const wantedScorecard = scorecards.find((card) => { return card.id === scorecardId });

          if (!wantedScorecard) return error('No such scorecard with id provided');

          return ok(wantedScorecard);
        }

        function getScorecardsCreateByUser() {
          if (!isLoggedIn()) return unauthorized();

          const userId = params.get('userId');
          const scorecardsCreatedByUser = scorecards.filter(x => x.createdBy.userId.toLowerCase() === userId.toLowerCase());

          return ok(scorecardsCreatedByUser);
        }

        // Publish or revoke publication for a card
        function setPublishScorecardState() {
          if (!isLoggedIn()) return unauthorized();

          const scorecardId = body.scorecardId;
          const publishedState = body.publishState;
          const newPublishState = publishedState === "publish"? true : false;

          const tempScorecards = [...scorecards];
          let scorecardFound = false;

          tempScorecards.find((card, index) => {
            if (card.id === scorecardId) {
                scorecardFound = true;
                const newScorecard = {...card, published: newPublishState }
                return  tempScorecards[index] = newScorecard;
            }
          });

          if (!scorecardFound) return error('No such scorecard to publish');

          scorecards = tempScorecards; // return changed scorecards!

          return ok({
            taskCompleted: true,
            changedTo: publishedState
          });
        }

        function editScorecardProjectTeam(){
          if (!isLoggedIn()) return unauthorized();
          const scorecardId = body.scorecardId;
          const projectRoles = body.projectRoles;

          const tempScorecards = [...scorecards];
          let scorecardFound = false;

          tempScorecards.find((card, index) => {
            if (card.id === scorecardId) {
              scorecardFound = true;
              const newScorecard = {...card, team: projectRoles }
              return  tempScorecards[index] = newScorecard;
            }
          });

          if (!scorecardFound) return error('No such scorecard to modify team');

          scorecards = tempScorecards; // return changed scorecards!

          return ok({
            taskCompleted: true,
          });
        }

        function modifyScorecardProjectGoal(){
          if (!isLoggedIn()) return unauthorized();
          const scorecardId = body.scorecardId;
          const projectGoal = body.projectGoal;

          const tempScorecards = [...scorecards];
          let scorecardFound = false;

          tempScorecards.find((card, index) => {
            if (card.id === scorecardId) {
              scorecardFound = true;
              const newScorecard = {...card, goal: projectGoal }
              return  tempScorecards[index] = newScorecard;
            }
          });

          if (!scorecardFound) return error('No such scorecard to modify team');

          scorecards = tempScorecards; // return changed scorecards!

          return ok({
            taskCompleted: true,
          });
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
