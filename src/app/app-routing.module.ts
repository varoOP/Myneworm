import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BookPageComponent } from "./book-page/book-page.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { ImprintPageComponent } from "./imprint-page/imprint-page.component";
import { ImprintIndexComponent } from "./imprint-index/imprint-index.component";
import { MissingPageComponent } from "./missing-page/missing-page.component";
import { SeriesPageComponent } from "./series-page/series-page.component";
import { FaqPageComponent } from "./faq-page/faq-page.component";
import { AboutPageComponent } from "./about-page/about-page.component";
import { DataCorrectionFormComponent } from "./data-correction-form/data-correction-form.component";
import { ContactPageComponent } from "./contact-page/contact-page.component";
import { SearchPageComponent } from "./search-page/search-page.component";

const routes: Routes = [
	{ path: "", component: HomePageComponent },
	{ path: "home", pathMatch: "full", redirectTo: "" },
	{ path: "book/:isbn", component: BookPageComponent },
	{ path: "publisher", component: ImprintIndexComponent },
	{ path: "publisher/:id", component: ImprintPageComponent },
	{ path: "series/:id", component: SeriesPageComponent },
	{ path: "search", component: SearchPageComponent },
	{ path: "about", component: AboutPageComponent },
	{ path: "faq", component: FaqPageComponent },
	{ path: "correction", component: DataCorrectionFormComponent },
	{ path: "contact", component: ContactPageComponent },
	{ path: "**", pathMatch: "full", component: MissingPageComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
