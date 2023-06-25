import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OpenaiService } from 'src/app/services/openai/openai.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent {
  input = new FormControl('春っぽい雰囲気に変えて');

  constructor(private readonly openaiService: OpenaiService) {}

  action() {
    const v = this.input.value;
    if (!v) {
      return;
    }
    this.openaiService.chatCompletion(v).subscribe((data) => {
      const choice = data.choices[0];
      const finishReason = choice.finish_reason;
      console.log(choice);
    });
  }
}
