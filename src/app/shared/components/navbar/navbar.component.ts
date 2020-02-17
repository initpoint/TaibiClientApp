import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CoreService } from '../../services/core.service';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public coreService: CoreService, private router: Router) { }

  ngOnInit() {
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
