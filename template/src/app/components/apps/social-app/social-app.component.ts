import { Component, OnInit, ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-social-app',
  templateUrl: './social-app.component.html',
  styleUrls: ['./social-app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SocialAppComponent implements OnInit {
  
  public url: any;
  public isProfile = false;
  public isProfile2 = false;
  public isProfile3 = false;
  public isProfile4 = false;
  public isProfile5 = false;
  public isProfile6 = false;
  public isProfile7 = false;
  public isProfile8 = false;
  public isProfile9 = false;
  public openTab: string = 'Timeline' 
    public active = 1;

  constructor() { }

  //Fileupload
  readUrl(event: any) {
    if (event.target.files.length === 0)
      return;
    //Image upload validation
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    // Image upload
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.url = reader.result;
    }
  }

  tabbed(val) {
    this.openTab = val;
  }
  ngOnInit() { }

}
