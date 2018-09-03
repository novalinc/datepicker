# NlDatepicker

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).



----------------------------------------------------

# Angular 2/4 Datetime Picker

Native Angular 2 date picker component styled by Twitter Bootstrap 3

The idea of this project is to create a custome component selecting and showing dates selected by the user.
I've decided NOT to use ```html <input type="date|datetime-local|month|time">``` because of browser restriction (does not work on firefox), and be cause I'd like the flexibility of customizing the appearance of the date using HTML tags.
I've decided NOT to use @angular/material because I wanted something easier to customize

There is still much to do here, and any support is welcome.
I'm in no way an expert in frontend devepment (I'm a Java developer), so alot of these things are new to me.

[View Demo](https://novalinc.github.io/demos)

## Installation
Install @novalinc/datepicker via NPM

```bash
$ cd /path/to/your-awesome-project
$ yarn add @novalinc/datepicker@latest

```

## Intergration

In your application's module file

```typescript
import { DatepickerModule } from '@novalinc/datepicker';

]);

@NgModule({
...
    DatepickerModule
...
})
export class FeatureModule { }
```
In your application's component file
```typescript
import { Component } from '@angular/core';
import { DateModel, DatepickerOptions, TemporalType } from '@novalinc/datepicker';
 
@Component({
  selector: 'ft-comp',
  templateUrl: 'feature.component.html'
})

export class FeatureComponent implements OnInit {
    departure: DateModel;
    departureOptions: DatepickerOptions;

    ngOnInit(): void {
        // Set options for the datepicker
        this.departureOptions = new DatepickerOptions();
        this.departureOptions.temporal = TemporalType.TIMESTAMP; 
        this.departureOptions.placeholder = "Depart date";
    }
}
```
In your component's view (html)
```html

<form #form="ngForm"> 
    <div class="row">
        <div class="col-sm-6">
            <h4>Selecting both date and time e.g. Departure time</h4>
            <nl-datepicker name="departure" [options]="departureOptions" [(ngModel)]="departure"></nl-datepicker>
        </div>
        <div class="col-sm-6">

        </div>
    </div>
</form>
```

## Dependencies
All dependencies are specified in the package.json, but the following are a MUST:
* moment (2.17.1)
