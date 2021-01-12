import { Component, OnInit } from '@angular/core';
import {getEnumAsArray} from "../../shared/helpers/utils";
import {TeamSegmentsEnum, teamSegmentsEnum2LabelMapping} from "./team-segments.enum";

@Component({
  selector: 'app-team',
  templateUrl: './team.page.html',
  styleUrls: ['./team.page.scss'],
})
export class TeamPage implements OnInit {

  readonly segmentsEnum = TeamSegmentsEnum;
  readonly segments = getEnumAsArray(TeamSegmentsEnum);
  readonly segmentsEnum2LabelMapping = teamSegmentsEnum2LabelMapping;

  selectedSegment: TeamSegmentsEnum = TeamSegmentsEnum.NEWS;

  constructor() { }

  ngOnInit() {
  }
  segmentChanged($event: any) {

  }
}
