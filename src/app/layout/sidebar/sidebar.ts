import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { navigationItems } from '../../core/navigation/navigation.config';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {

  navigationItems = navigationItems;

  openMenu: string | null = null;

  toggleMenu(label: string): void {
    this.openMenu =
      this.openMenu === label ? null : label;
  }

}
