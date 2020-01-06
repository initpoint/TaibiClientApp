export class Config {

  //  public static apiUrl = 'http://localhost:53979/';
  public static apiUrl = 'http://proemcs.com:8031/';

  //#region Account
  public static Login = `${Config.apiUrl}api/Auth/Login`;
  public static Register = `${Config.apiUrl}api/Auth/Register`;
  //#Account


  //#region Account
  public static Account = 'api/Account/'
  public static UserById = `${Config.Account}UserById`;
  public static UserList = `${Config.Account}UserList`;
  public static CreateUser = `${Config.Account}Create`;
  public static EditUser = `${Config.Account}Edit`;
  public static DeleteUser = `${Config.Account}Delete`;
  public static RestoreUser = `${Config.Account}Restore`;
  public static ChangePassword = `${Config.Account}RequestChangePassword`;
  //#Account


}
