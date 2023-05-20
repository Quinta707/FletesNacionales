import { Component, OnInit, ViewChild } from '@angular/core';
import { AddBookmarkComponent } from "./modal/add-bookmark/add-bookmark.component";
import { EditBookmarkComponent } from "./modal/edit-bookmark/edit-bookmark.component";
import { CreateTagComponent } from "./modal/create-tag/create-tag.component";

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {

  @ViewChild("addbookmark") AddBookmark: AddBookmarkComponent;
  @ViewChild("editbookmark") EditBookmark: EditBookmarkComponent;
  @ViewChild("createTag") CreateTag: CreateTagComponent;

  public listBookmark: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  changeLayoutBookmark() {
    this.listBookmark = !this.listBookmark
  }

}
