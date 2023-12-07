import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VoiceRecognitionService } from 'src/app/services/voice-recognition.service';
@Component({
  selector: 'app-home',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  // Keep active api calls subscription.
  public searchForm: FormGroup;
  public isUserSpeaking: boolean = false;
  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private voiceRecognition: VoiceRecognitionService
  ) {
    // Initialize form group.
    this.searchForm = this.fb.group({
      searchText: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.initVoiceInput();
  }

  /**
   * @description Function to stop recording.
   */
  stopRecording() {
    this.voiceRecognition.stop();
    this.isUserSpeaking = false;
  }

  /**
   * @description Function for initializing voice input so user can chat with machine.
   */
  initVoiceInput() {
    // Subscription for initializing and this will call when user stopped speaking.
    this.voiceRecognition.init().subscribe(() => {
      // User has stopped recording
      // Do whatever when mic finished listening
    });

    // Subscription to detect user input from voice to text.
    this.voiceRecognition.speechInput().subscribe((input) => {
      // Set voice text output to
      this.searchForm.controls.searchText.setValue(input);
    });
  }

  /**
   * @description Function to enable voice input.
   */
  startRecording() {
    this.isUserSpeaking = true;
    this.voiceRecognition.start();
    this.searchForm.controls.searchText.reset();
  }
}
