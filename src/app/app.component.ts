import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  div1:boolean=false;
  div2:boolean=false;
  div3:boolean=false;


  div1Function(){
    debugger;
    this.div1=!this.div1;
    this.div2=false;
}
div2Function(){
  this.div1=true;
  this.div2=true;
}
div3Function()
{
  this.div1=false;
}
//   $('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
//   if (!$(this).next().hasClass('show')) {
//     $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
//   }
//   var $subMenu = $(this).next(".dropdown-menu");
//   $subMenu.toggleClass('show');


//   $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
//     $('.dropdown-submenu .show').removeClass("show");
//   });


//   return false;
// });

}
