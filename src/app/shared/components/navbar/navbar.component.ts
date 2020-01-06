import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CoreService } from '../../services/core.service';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

@Output() toggleMenu:EventEmitter<void> = new EventEmitter<void>();
  constructor(public coreService: CoreService,private router: Router) { }
  toggle(){
   this.toggleMenu.emit()
  }
  ngOnInit() { 
   
   }
   logOut(){
     localStorage.clear();
     this.router.navigate(['login']);
   }
}
