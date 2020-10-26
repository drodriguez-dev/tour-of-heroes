import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'; // TODO Try to remove this line, what happens?
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.loadHero();
  }

  loadHero() {
    const id = +this.route.snapshot.paramMap.get('id'); // TODO Change to Number(...)
    this.heroService.getHero(id).subscribe(hero => this.hero = hero);
  }

  goBack() {
    this.location.back();
  }
}
