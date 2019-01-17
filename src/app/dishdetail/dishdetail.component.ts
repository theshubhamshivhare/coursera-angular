import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Dish } from './../shared/dish';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  @ViewChild('cform') commentFormDirective;
  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  comment: any;
  commentForm: FormGroup;

  formErrors = {
    author: '',
    comment: '',
    rating: ''
  };

  validationMessages = {
    author: {
      required: 'Author Name is required.',
      minlength: 'Author Name must be at least 2 characters long.',
      maxlength: 'Author Name cannot be more than 25 characters long.'
    },
    comment: {
      required: 'Comment is required.'
    },
    rating: {
      required: 'Ratings are   required.'
    }
  };

  constructor(
    private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder
  ) {
    this.createComment();
  }

  ngOnInit() {
    this.dishservice
      .getDishIds()
      .subscribe(dishIds => (this.dishIds = dishIds));

    this.route.params
      .pipe(
        switchMap((params: Params) => this.dishservice.getDish(params['id']))
      )
      .subscribe(dish => {
        this.dish = dish;
        this.setPrevNext(dish.id);
      });
  }

  createComment(): void {
    this.commentForm = this.fb.group({
      author: [
        '',
        [Validators.required, Validators.minLength(2), Validators.maxLength(25)]
      ],
      comment: ['', Validators.required],
      rating: ['2', Validators.required]
    });
    this.commentForm.valueChanges.subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) {
      return;
    }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[
      (this.dishIds.length + index - 1) % this.dishIds.length
    ];
    this.next = this.dishIds[
      (this.dishIds.length + index + 1) % this.dishIds.length
    ];
  }

  goBack(): void {
    this.location.back();
  }

  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }
  onSubmit() {
    var today = new Date();
    console.log(today);
    this.comment = this.commentForm.value;
    this.comment.date = today.toISOString();
    console.log(this.comment);
    this.commentForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
    this.dish.comments.push(this.comment);
    this.commentFormDirective.resetForm();
  }
}
