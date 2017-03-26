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
$ npm install --save @novalinc/datepicker@latest

```
## Angular CLI Scripts and Styles Configuration
Date picker relies heavily on [Twitter Bootstrap](http://getbootstrap.com/getting-started/#download) for styling, so you need to configure bootstrap globally for your application.
In the ```.angular-cli.json``` file, please be sure to set the followng:

```json
...
    "styles": [
    "../node_modules/bootstrap/dist/css/bootstrap.min.css",
    "styles.css"
    ],
    "scripts": [
    "../node_modules/jquery/dist/jquery.min.js",
    "../node_modules/bootstrap/dist/js/bootstrap.min.js"
    ],
...
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
import { DateModel } from '@novalinc/datepicker';
 
@Component({
  selector: 'ft-comp',
  templateUrl: 'feature.component.html'
})

export class AppComponent {
  departure: DateModel;

}
```
In your component's view (html)
```html

<form #form="ngForm"> 
    <div class="row">
        <div class="col-sm-6">
            <h4>Selecting both date and time e.g. Departure time</h4>
            <nl-datepicker name="departure" temporal="timestamp" [(ngModel)]="departure"></nl-datepicker>
        </div>
        <div class="col-sm-6">

        </div>
    </div>
</form>

```

## Developement

```bash
$ cd novalinc-datepicker
# Build library
$ npm run build
```

## Publish Library

```bash
# Ensure that the project has been built first
$ cd dist # Be sure to ONLY publish the dist content and NOT the rest of the project
$ npm publish --access=public
```

## Dependencies
All dependencies are specified in the package.json, but the following are a MUST:
* moment (2.17.1)
* bootstrap (3.3.7)
