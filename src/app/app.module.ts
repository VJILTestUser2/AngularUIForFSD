
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {HttpModule} from '@angular/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import { AppComponent } from './app.component';
import { FilterPipe} from './view-task/filter.pipe';
import { AddTaskComponent } from './add-task/add-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { TaskserviceService } from './view-task/taskservice.service';
import { UserComponent } from './user/user.component';
import { ProjectComponent } from './project/project.component';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {DialogOverviewExampleDialog} from './project/project.component';
import {DialogOverviewExampleDialogTask} from './add-task/add-task.component';
import {DialogOverviewExampleDialogProject} from './view-task/view-task.component';
import {DialogOverviewExampleDialogEdit } from './view-task/view-task.component';
import {DialogOverviewExampleDialogUser } from './add-task/add-task.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {A11yModule} from '@angular/cdk/a11y';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';

import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';

import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';

import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';

//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatSortModule,
    MatTableModule,
    MatNativeDateModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatListModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule
    
   
    
  ],
  entryComponents: [ DialogOverviewExampleDialog, DialogOverviewExampleDialogUser,
    DialogOverviewExampleDialogTask,DialogOverviewExampleDialogProject,DialogOverviewExampleDialogEdit],
 
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    A11yModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule,
  ],  
  declarations: [
    AppComponent,
    FilterPipe,
    AddTaskComponent,
    ViewTaskComponent,
    UserComponent,
    ProjectComponent,
    DialogOverviewExampleDialog,
    DialogOverviewExampleDialogTask,
    DialogOverviewExampleDialogUser,
    DialogOverviewExampleDialogProject,
    DialogOverviewExampleDialogEdit

  ],
 
  //providers: [{provide: LOCALE_ID, useValue: 'de'}],
  providers: [TaskserviceService, { provide: LOCALE_ID, useValue: 'de' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
