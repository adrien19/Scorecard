
export class User {

  userId: string;
  userLoginId: string;
  userEmail:string;
  // password: string;

  private _USER_FIRST_NAME? = '';
  private _USER_LAST_NAME? = '';
  private _USER_FULL_NAME? = '';
  // token?: string;
  // canEditCard?: Scorecard[];
  // canViewCard?: Scorecard[];

  constructor(userId: string, userLoginId: string, userEmail: string, userFirstName?: string, userLastName?: string, fullName?: string){
      this.userId = userId;
      this.userLoginId = userLoginId;
      this.userEmail = userEmail;
      this.userFirstName = userFirstName;
      this.userLastName = userLastName;
      this.userfullName = fullName;
  }


  public set userFirstName(userFirstName: string) {
    if (userFirstName) {
      this._USER_FIRST_NAME = userFirstName;
    }
  }
  public get userFirstName() : string {
    return this._USER_FIRST_NAME;
  }

  public set userLastName(userLastName: string) {
    if (userLastName) {
      this._USER_LAST_NAME = userLastName;
    }
  }
  public get userLastName() : string {
      return this._USER_LAST_NAME;
  }

  public set userfullName(fullName: string) {
    if (fullName) {
      this._USER_FULL_NAME = fullName;
    }else if(this._USER_FIRST_NAME && this._USER_LAST_NAME){
      this._USER_FULL_NAME = `${this._USER_FIRST_NAME} ${this._USER_LAST_NAME}`
    }
  }
  public get userfullName() : string {
      return this._USER_FULL_NAME;
  }
}
