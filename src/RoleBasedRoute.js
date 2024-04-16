import { Navigate } from "react-router-dom";

const RoleBasedRoute = ({ Component, roles }) => {
    let userRole = "admin";
    return roles.includes(userRole) ? (
        <Component />
    ) : (
        <Navigate to="/unauthorized" />
    );
};

export default RoleBasedRoute;


// function checkMenuSize() {
//     var menu = document.getElementsByClassName('sub-menu')
//     if (menu.length === 0)
//         return;
//     const firstItem = menu[0]
//     var rect = firstItem.getBoundingClientRect();
//     for(menuItem of menu) {
//         console.log('menuItem', menuItem)
//         console.log('rect', {
//             x: rect.x,
//             w: rect.width,
//             l: rect.x + rect.width * 5,
//             r: window.innerWidth,
//             c: (window.innerWidth - rect.x) / 5
//         })
//         if (rect.x > 0 && rect.x + rect.width * 5 >= window.innerWidth) {
//             menuItem.style.minWidth = `calc((${window.innerWidth}px - 50px - ${rect.x}px) / 6)`
//             console.log('ww ', menuItem.style.minWidth)
//         } else {
//             menuItem.style.minWidth = "220px"
//             console.log('w ', menuItem.style.minWidth)
//         }
//     }
// }
// function checkMenuSize() {
//   var menu = document.getElementsByClassName('sub-menu');
//   var navMenu = document.getElementsByClassName('hfe-nav-menu')[0]; // Sélectionne l'élément avec la classe 'hfe-nav-menu'
//   console.log('navMenu ===>>> ', navMenu)
//   if (menu.length === 0)
//     return;

//   const firstItem = menu[0];
//   var rect = firstItem.getBoundingClientRect();

//   for (menuItem of menu) {
//     console.log('menuItem', menuItem);
//     console.log('rect', {
//       x: rect.x,
//       w: rect.width,
//       l: rect.x + rect.width * 5,
//       r: window.innerWidth,
//       c: (window.innerWidth - rect.x) / 5
//     });

//     if (rect.x > 0 && rect.x + rect.width * 5 >= window.innerWidth) {
//       menuItem.style.minWidth = `calc((${window.innerWidth}px - 50px - ${rect.x}px) / 6)`;
//       console.log('ww ', menuItem.style.minWidth);
//     } else {
//       menuItem.style.minWidth = "220px";
//       console.log('w ', menuItem.style.minWidth);
//     }
//   }

//   if (window.innerWidth < 992) { // Ajoutez cette condition pour les petits écrans d'ordinateur
//     navMenu.style.width = "892.8px";
//   }
// }

// checkMenuSize()

// window.addEventListener('resize', checkMenuSize)