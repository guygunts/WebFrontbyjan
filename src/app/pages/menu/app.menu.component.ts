import {Component, OnInit} from '@angular/core';
@Component({
    selector: 'app-menu',
    template: `
        <ul class="layout-menu">
            <li app-menuitem *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true"></li>
        </ul>
    `
})
export class AppMenuComponent implements OnInit {

    model: any[];

    constructor() {}

    ngOnInit() {
        this.model = [
            {
                label: 'Main', icon: 'pi pi-fw pi-star', routerLink: ['/home'],
                items: [
                    {label: 'basicdriver', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/home/basicdriver']},
                    {label: 'penalty', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/home/penalty']},
                    {label: 'property', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/home/property']},
                    {label: 'technical', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/home/technical']},
                    {label: 'traffic', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/home/traffic']},
                    {label: 'typedriverlicense', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/home/typedriverlicense']},
                    {label: 'question', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/home/question']},
                    {label: 'exam', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/home/exam']},
                ]
            },
        ];
    }
}
