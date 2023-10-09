import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject, Subscription, map } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { MenuItem, MessageService } from 'primeng/api';
import { User } from '../model/user';
import { AuthenticationService } from '../service/authentication.service';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
//import { NotificationType } from './enum/notification-type.enum';


import { FileUploadStatus } from '../model/file-upload-status';
import { Role } from '../model/role';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { StockService } from '../service/stock.service';
import { UserService } from '../service/user.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  encapsulation:ViewEncapsulation.None,
    animations: [
    trigger('cardAnimation', [
      state(
        'in',
        style({
          transform: 'translateX(0)',
          opacity: 1
        })
      ),
      transition('void => *', [
        style({
          transform: 'translateX(-100%)',
          opacity: 0
        }),
        animate(300)
      ]),
      transition('* => void', [
        animate(
          300,
          style({
            transform: 'translateX(100%)',
            opacity: 0
          })
        )
      ])
    ])
  ]
})
export class UserComponent implements OnInit {
  private titleSubject = new BehaviorSubject<string>('Users');
  public titleAction$ = this.titleSubject.asObservable();
  public user: any;

  public users: User[];

  public refreshing = false;
  public selectedUser: any;
  public fileName: any;
  public profileImage: any;
  private subscriptions: Subscription[] = [];
  public editUser = new User();
  private currentUsername: any;

  public fileStatus = new FileUploadStatus();
  items: any;
 
  activeIndex: number = 0;
  
  ProfileImage: any;
  


  sendNotification: any;
  notifications: any;
  isAdmin: any;
  constructor(private userService: UserService,
    private stockService: StockService,
    private authenticationService: AuthenticationService,
    private messageService: MessageService,
    private router: Router) { }

    ngOnInit(): void {
      this.jsCode();
  this.getALlUsers();
      this.user = this.authenticationService.getUserFromLocalCache();
  
      this.fetchNotifications(this.user);
  
  
  
      this.items = [{
        label: 'Purchase Requarst Sent To Manager',
        command: (event: any) => {
          this.activeIndex = 0;
          this.messageService.add({ severity: 'info', summary: 'First Step', detail: event.item.label });
        }
      },
      {
        label: 'Seat',
        command: (event: any) => {
          this.activeIndex = 1;
          this.messageService.add({ severity: 'info', summary: 'Seat Selection', detail: event.item.label });
        }
      },
      {
        label: 'Payment',
        command: (event: any) => {
          this.activeIndex = 2;
          this.messageService.add({ severity: 'info', summary: 'Pay with CC', detail: event.item.label });
        }
      },
      {
        label: 'Confirmation',
        command: (event: any) => {
          this.activeIndex = 3;
          this.messageService.add({ severity: 'info', summary: 'Last Step', detail: event.item.label });
        }
      }
      ];
    }
    cardState = 'in';

   
  
    animateIn() {
      this.cardState = 'in';
    }
  
    animateOut() {
      this.cardState = 'out';
    }
    getALlUsers(){
      this.userService.getAllUsers().subscribe((data:any)=>{
console.log(data);
this.users=data['data']['users'];
      })
    }
  public changeTitle(title: string): void {
    this.titleSubject.next(title);
  }
  public getUsers(showNotification: boolean): void {

    this.refreshing = true;
  }
  jsCode() {
    let sidebar = document.querySelector(".sidebar") as HTMLElement;
let sidebarBtn = document.querySelector(".sidebarBtn") as HTMLElement;
sidebarBtn.onclick = function() {
  sidebar.classList.toggle("active");
  if(sidebar.classList.contains("active")){
    sidebarBtn.classList.replace("bx-menu" ,"bx-menu-alt-right");
  } else {
    sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
  }
}
    document.addEventListener("DOMContentLoaded", function () {
      const heartIcon = document.getElementById("heart") as HTMLDivElement;
      heartIcon.onclick = function () {
        const gratipayIcon = document.querySelector(".fa-gratipay") as HTMLElement;
        gratipayIcon.style.color = "#E74C3C";
      };
    });
  }

  editUseraction(item:any)
  {
console.log(item);
this.router.navigate(['/profile', item.id]);
  }
  deleteUser(item:any){
    console.log(item)  
  this.userService.delete$(item).subscribe(res=>{
console.log(res)
  })
     

  }
  getStock(): void {

    alert('do something');

  }
  public onAddNewUser(userForm: NgForm): void {
    const formData = this.userService.createUserFormDate(null, userForm.value, this.profileImage);


    this.subscriptions.push(
      this.userService.addUser(formData).subscribe(response => {
        document.getElementById('new-user-close')?.click();
        
        this.getUsers(false);
        this.fileName = null;
        this.profileImage = null;
        userForm.reset();
     //     this.messageService.add({ severity: 'success', summary: 'Success', detail: `${response.firstName} ${response.lastName} added successfully` });
      },
        (errorResponse: HttpErrorResponse) => {
          //  this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.profileImage = null;
        }
      )
    );
  }


  public onUpdateCurrentUser(user: User): void {
    this.refreshing = true;
    // this.currentUsername = this.authenticationService.getUserFromLocalCache().username;
    this.currentUsername = 'yk';
    const formData = this.userService.createUserFormDate(this.currentUsername, user, this.profileImage);
    this.subscriptions.push(
      // this.userService.updateUser(formData).subscribe(
      //   (response: User) => {
      //     this.authenticationService.addUserToLocalCache(response);
      //     this.getUsers(false);
      //     this.fileName = null;
      //     this.profileImage = null;
      //     this.messageService.add({ severity: 'success', summary: 'Success', detail: `${response.firstName} ${response.lastName} updated successfully` });

      //   },
      //   (errorResponse: HttpErrorResponse) => {
      //     //   this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
      //     this.refreshing = false;
      //     this.profileImage = null;
      //   }
      // )
    );
  }
  public onProfileImageChange(event:any){

console.log(event);

  }


  public onUpdateProfileImage(): void {
    const formData = new FormData();
    formData.append('username', this.user.username);
    formData.append('profileImage', this.profileImage);
    this.subscriptions.push(
      // this.userService.updateProfileImage(formData).subscribe(
      //   (event: HttpEvent<any>) => {
      //     this.reportUploadProgress(event);
      //   },
      //   (errorResponse: HttpErrorResponse) => {
      //     //  this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
      //     this.fileStatus.status = 'done';
      //   }
      // )
    );
  }
  private reportUploadProgress(event: HttpEvent<any>): void {
    switch (event.type) {
      case HttpEventType.UploadProgress:
        //this.fileStatus.percentage = Math.round(100 * event.loaded / event.total);
        this.fileStatus.status = 'progress';
        break;
      case HttpEventType.Response:
        if (event.status === 200) {
          this.user.profileImageUrl = `${event.body.profileImageUrl}?time=${new Date().getTime()}`;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: `${event.body.firstName}\'s profile image updated successfully` });


          this.fileStatus.status = 'done';
          break;
        } else {
          //   this.sendNotification(NotificationType.ERROR, `Unable to upload image. Please try again`);
          break;
        }
      default:
        `Finished all processes`;
    }
  }


  public get isAdminOrManager(): boolean {
    return this.isAdmin || this.isManager;
  }




  public get isManager(): boolean {
    const role = this.getUserRole();


    return (this.isAdmin || role) === Role.MANAGER;

  }




  public onLogOut(): void {
    this.authenticationService.logOut();
    this.router.navigate(['login']);
    // this.sendNotification(NotificationType.SUCCESS, `You've been successfully logged out`);
  }

  onSelectUser(name:any){}
  onEditUser(i:any){}
  onDeleteUder(i:any){}
  private getUserRole(): string {
    return 'Admin';
  }
  public clickButton(buttonId:string): void{
   document.getElementById(buttonId)?.click();

  }



  public updateProfileImage(): void {


    this.clickButton('onProfileImageChange');

  }

  onResetPassword(val: any) { }
 
  complete() { }
  prevPage() {
    this.activeIndex--;
  }

  nextPage() {
    this.activeIndex++;
  }
  saveNewUser():void  {

    this.clickButton('new-user-save');
    document.getElementById('new-user-save')?.click();
   }
  
  
  
  
  
  searchUsers() {

  }
  onUpdateUser() { }

  fetchNotifications(user: any) {
    this.notifications = [];
    let userObj: any = {};
    userObj.receiverId = JSON.parse(user)['userId'];
    this.stockService.fetchNotifications(userObj).subscribe(
      (notifications: any) => {
        console.log(notifications);
        this.notifications = notifications;
      },
      (error: any) => {
        console.error('Error fetching notifications:', error);
      }
    );
  }


}
