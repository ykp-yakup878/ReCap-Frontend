import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css'],
})
export class ColorComponent implements OnInit {
  colors: Color[] = [];
  curretColor: Color | null;
  filterText = '';

  constructor(private colorService: ColorService) {}

  ngOnInit(): void {
    this.getColors();
  }
  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
  setCurrentlyColor(color: Color) {
    this.curretColor = color;
  }
  getCurrentColorClass(color: Color) {
    if (color == this.curretColor) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }
  getAllColorClass() {
    if (!this.curretColor) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }
  cleanCurrentColor() {
    this.curretColor = null;
  }
}
