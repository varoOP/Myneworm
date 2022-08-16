import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MynewormAPIService } from "../services/myneworm-api.service";
import { CalendarOptions } from "@fullcalendar/angular";
import { CalendarManagerComponent } from "../shared/calendar-manager/calendar-manager.component";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DatepickerModalComponent } from "../shared/datepicker-modal/datepicker-modal.component";
import { ImprintData } from "../models/imprintData";
import { Title } from "@angular/platform-browser";

@Component({
	selector: "app-imprint-page",
	templateUrl: "./imprint-page.component.html",
	styleUrls: ["./imprint-page.component.css"]
})
export class ImprintPageComponent implements OnInit {
	calendarVisible = false;
	calendarOptions: CalendarOptions | undefined;
	imprint: ImprintData;

	@ViewChild("calendar", { static: false }) calendarManager!: CalendarManagerComponent;

	constructor(
		private route: ActivatedRoute,
		private service: MynewormAPIService,
		public matDialog: MatDialog,
		private titleService: Title
	) {}

	ngOnInit(): void {
		this.calendarOptions = {
			themeSystem: "standard",
			height: "calc(100vh - 190px)",
			initialView: "listMonth",
			editable: false,
			showNonCurrentDates: false,
			fixedWeekCount: false,
			headerToolbar: {
				left: "prev,today,dateSelector,next",
				center: "title",
				right: ""
			},
			customButtons: {
				dateSelector: {
					icon: "calendar",
					text: "Select Date",
					click: () => {
						this.selectDate();
					}
				}
			}
		};

		this.calendarVisible = true;

		this.route.params.subscribe((data) => {
			this.service.getImprintInfo(data.id).subscribe((data: ImprintData) => {
				this.imprint = data;
				this.titleService.setTitle(`Myneworm - ${this.imprint.name}`);
			});
		});
	}

	selectDate(): void {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.disableClose = true;
		dialogConfig.id = "datepicker-modal";

		dialogConfig.height = "350px";
		dialogConfig.width = "600px";
		const modalDialog = this.matDialog.open(DatepickerModalComponent, dialogConfig);

		modalDialog.afterClosed().subscribe((result) => {
			if (result) {
				this.calendarManager.updateDate(result);
			}
		});
	}

	getLogo(id: number) {
		return this.service.getAsset(`imprint/${id}`);
	}
}
