export class User {
  public userId: string;
  public firstName: string | null;
  public lastName: string | null;
  public username: string | null;
  public email: string | null;

  public profileImageUrl: string | null;
  public active: boolean | null;
  public notLocked: boolean | null;
  public role: string | null;
  public authorities: [];

  constructor() {
    this.userId = '';
    this.firstName = '';
    this.lastName = '';
    this.username = '';
    this.email = '';
    // this.lastLoginDate = null;
    // this.lastLoginDateDisplay = null;
    // this.joinDate = null;
    this.profileImageUrl = '';
    this.active = false;
    this.notLocked = false;
    this.role = '';
    this.authorities = [];
  }

}
