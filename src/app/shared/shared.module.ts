import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardinalPointPipe } from './pipe/cardinal-point.pipe';

@NgModule({
  declarations: [CardinalPointPipe],
  imports: [CommonModule],
  exports: [CardinalPointPipe],
})
export class SharedModule {}
