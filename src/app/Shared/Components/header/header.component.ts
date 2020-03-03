import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Auth/Models/user';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Auth/Services/authentication.service';
import { Role } from 'src/app/Auth/Models/role';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {}
