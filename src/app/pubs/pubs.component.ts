import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '@TableComponenets';

@Component({
  selector: 'app-pubs',
  standalone: true,
  imports: [FormsModule,CommonModule,AlertComponent],
  templateUrl: './pubs.component.html',
  styleUrl: './pubs.component.scss'
})
export class PubsComponent {
  private apiUrl = `${environment.API_URL}`
  publications: any[] = [];
  selectedPublication: any = null;
  updatedData: any = {};
  updatedImage: File | null = null;
  newPublication: any = { name: '', url: '', state: false };
  searchQuery: string = '';
  showModal: boolean = false;
  imageApi = `${environment.API_URL_IMAGE}`
  imagePreview: string | ArrayBuffer | null = null;
  alerts: any = []
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadPublications();
  }
  toggleModal() {
    this.showModal = !this.showModal;
  }
  loadPublications() {
    this.getPublication().subscribe
    (
      (data:any) => {
        this.publications = data
        // this.updatedData=data[0]
        // console.log(data)
      },
      (error:any) =>{console.error(error)}
    );
  }

  selectPublication(publication: any) {
    if(publication?.id!==this.selectedPublication?.id){
          this.selectedPublication = publication;
    this.updatedData = { ...publication };
    }else{
      this.updatedData=null;
      this.selectedPublication=null
    }

  }

  updatePublication() {
    if (this.selectedPublication) {
      this.patchPublication({
        id: this.selectedPublication.id,
        form: this.updatedData
      }).subscribe(
        response => {
          this.loadPublications();
          this.alerts.push(
            {
              type: 's',
              message: 'Pub updated successfully'
            }
          );
          this.selectedPublication = null;
        },
        error => {
          this.alerts.push(
            {
              type: 's',
              message: 'Operation faild'
            }
          );
          console.error(error)
        }
      );
    }
  }

  updatePublicationImage() {
    if (this.selectedPublication && this.updatedImage) {
      const formData = new FormData();
      formData.append('file', this.updatedImage);
      this.patchPublicationImage({
        id: this.selectedPublication.id,
        form: formData
      }).subscribe(
        response => {
          
          this.loadPublications();
          this.alerts.push(
            {
              type: 's',
              message: 'Image uploaded successfully'
            }
          );
          this.selectedPublication = null;
          this.updatedImage = null;
        },
        error =>{
          this.alerts.push(
            {
              type: 's',
              message: 'Operation faild'
            }
          );
          console.error(error)}
      );
    }
  }

  deletePublications(id: string) {
    if(confirm('Confirm pub delete')){
      this.deletePublication(id).subscribe(
        response =>{
          this.alerts.push(
            {
              type: 's',
              message: 'pub deleted successfully'
            }
          );
          this.loadPublications()},
        error => {
          this.alerts.push(
            {
              type: 's',
              message: 'Operation faild'
            }
          );
          console.error(error)}
      );

    }

  }
 onImageChange(event: any): void {
    this.updatedImage = event.target.files[0];
    if (this.updatedImage) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.updatedImage);
    }
  }

  isPublicationChanged(): boolean {
    return JSON.stringify(this.updatedData) !== JSON.stringify(this.selectedPublication);
  }

  addPublication() {
    this.postPublication(this.newPublication).subscribe(
      response => {
        this.alerts.push(
          {
            type: 's',
            message: 'pub have added successfully'
          }
        );
        this.loadPublications();
        this.newPublication = { name: '', url: '', state: false };
      },
      error => {
        this.alerts.push(
          {
            type: 's',
            message: 'Operation faild'
          }
        );
        console.error(error)}
    );
  }

  filterPublications() {
    const query = this.searchQuery.toLowerCase();
    return this.publications.filter(publication => 
      publication.name.toLowerCase().includes(query) || 
      publication.state.toString().toLowerCase().includes(query)
    );
  }


  getPublication(): Observable<any> {
    return this.http.get(`${this.apiUrl}/banners`).pipe(
      catchError(this.handleError)
    );
  }

  postPublication(form: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/banners`, form).pipe(
      catchError(this.handleError)
    );
  }

  patchPublicationImage(data: { id: string, form: any }): Observable<any> {
    return this.http.patch(`${this.apiUrl}/banners/upload/${data.id}`, data.form).pipe(
      catchError(this.handleError)
   );
  }

  patchPublication(data: { id: string, form: any }): Observable<any> {
    return this.http.patch(`${this.apiUrl}/banners/${data.id}`, data.form).pipe(
      catchError(this.handleError)
    );
  }

  deletePublication(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/banners/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }
}

