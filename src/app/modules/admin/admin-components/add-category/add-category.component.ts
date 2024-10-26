import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../admin-services/admin.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent {

  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);
  router = inject(Router);
  adminService = inject(AdminService);
  toastrService = inject(ToastrService);

  categoryForm! : FormGroup;

  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      categoryName: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  postCategoryData() {
    console.log("Post category: ", this.categoryForm.value);
    const formData: FormData = new FormData();
    formData.append("img", this.selectedFile);
    formData.append("name", this.categoryForm.get("categoryName").value);
    formData.append("description", this.categoryForm.get("description").value);

    this.adminService.addCategory(formData).subscribe((res) => {
      console.log(res);
    })
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();

  }

  previewImage() {
    const reader = new FileReader();
    reader.onload= () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);

  }

}
