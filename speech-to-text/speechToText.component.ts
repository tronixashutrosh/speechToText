import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VoiceRecognitionService } from 'src/app/services/voice-recognition.service'; //Import from where you have stored your file
@Component({
  selector: 'app-home',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  // Keep active api calls subscription.
  public searchForm: FormGroup;
  public isUserSpeaking: boolean = false;
  public myNote: string = ""
  
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
    this.myNote = "This is the initial value of note from API" //If not using form initiate note value like this
    this.initVoiceInput();
  }

  /**
   * @description Function to stop recording.
   */
  stopSpeechRecognition() {
    const action = document.getElementById("action");
    const recognition =
      new webkitSpeechRecognition() || new SpeechRecognition();
    recognition.stop();
    this.voiceRecognition.stop();
    this.isUserSpeaking = false;
    action.innerHTML = "";
  }

  /**
   * @description Function for initializing voice input so user can chat with machine.
   */
  initVoiceInput() {
   let speechTxt = this.myNote; //If not using form this will make a local copy
    
    // Subscription for initializing and this will call when user stopped speaking.
    this.voiceRecognition.init().subscribe(() => {
      // User has stopped recording
      // Do whatever when mic finished listening
    });

    // Subscription to detect user input from voice to text.
    this.voiceRecognition.speechInput().subscribe((input) => {
      // Set voice text output to
      // Use this is using form
      // this.searchForm.controls.searchText.setValue(input);

      //Use thsi if not using form
      speechTxt = speechTxt.concat(" ", input);
      this.myNote = speechTxt;
    });
    });
  }

  /**
   * @description Function to enable voice input.
   */
  runSpeechRecognition = () => {
    const action = document.getElementById("action");
    action.innerHTML = "Listening...";
    this.isUserSpeaking = true;
    this.voiceRecognition.start();
  };
}
