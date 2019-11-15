import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: HomePage,
        children: [
            {
                path: 'timeline',
                children: [
                    {
                        path: '',
                        loadChildren: './timeline/timeline.module#TimelinePageModule'
                    },
                    {
                        path: 'add-timeline',
                        loadChildren: './timeline/add-timeline/add-timeline.module#AddTimelinePageModule'
                    },
                { path: ':id', loadChildren: './timeline/detailline/detailline.module#DetaillinePageModule' },
                ]
            },
            {
                path: 'progress',
                children: [
                    {
                        path: '',
                        loadChildren: './progress/progress.module#ProgressPageModule'
                    },
                    { 
                        path: ':id', 
                        loadChildren: './progress/detailpro/detailpro.module#DetailproPageModule' 
                    },
                    { 
                        path: 'add-langkah',
                     loadChildren: './progress/add-langkah/add-langkah.module#AddLangkahPageModule' 
                    },
                    { 
                        path: 'add-bahan', 
                    loadChildren: './progress/add-bahan/add-bahan.module#AddBahanPageModule' 
                },
                ]
            },
            {
                path: 'profile',
                children: [
                    {
                        path: '',
                        loadChildren: './profile/profile.module#ProfilePageModule'
                    },
                    
                    {
                        path: 'edit-profile/:id',
                        loadChildren: './profile/edit-profile/edit-profile.module#EditProfilePageModule'
                    },
                    { path: 'edit/:id', loadChildren: './profile/edit/edit.module#EditPageModule'}
                ]
            },
            {
                path: 'meeting',
                children: [
                    {
                        path: '',
                        loadChildren: './meeting/meeting.module#MeetingPageModule'
                    },
                    {
                        path: 'add-meeting', 
                        loadChildren: './meeting/add-meeting/add-meeting.module#AddMeetingPageModule'
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/home/tabs/timeline',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/home/tabs/timeline',
        pathMatch: 'full'
    },
 


// { path: 'detailpro', loadChildren: './progress/detailpro/detailpro.module#DetailproPageModule' },
//   { path: 'progress', loadChildren: './progress/progress.module#ProgressPageModule' },
//   { path: 'detailline', loadChildren: './timeline/detailline/detailline.module#DetaillinePageModule' },
//   { path: 'add-langkah', loadChildren: './timeline/add-langkah/add-langkah.module#AddLangkahPageModule' },
//   { path: 'add-bahan', loadChildren: './timeline/add-bahan/add-bahan.module#AddBahanPageModule' },


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeRoutingModule { }
