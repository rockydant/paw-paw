package main

import (
	"fmt"
	"log"

	"github.com/gocolly/colly/v2"
)

type Pet struct {
	Image string
	Name  string
	Id    string
}

func main() {
	url := "https://sdhumane.org/adopt/available-pets"
	// Instantiate default collector
	c := colly.NewCollector(
	// Visit only domains: hackerspaces.org, wiki.hackerspaces.org
	//colly.AllowedDomains(url),
	)

	// On every a element which has href attribute call callback
	c.OnHTML("div[id=animalGallery]", func(e *colly.HTMLElement) {
		e.ForEach(".col-md-3 .pet-item", func(_ int, el *colly.HTMLElement) {
			pet := Pet{
				Image: el.ChildAttr("div.img-square > img", "src"),
				Name:  el.ChildText("div.pet-info > span[class=petName]"),
				Id:    el.ChildText("div.pet-info > span[class=petId]"),
			}

			log.Println(pet.Name)
			log.Println(pet.Image)
			log.Println(pet.Id)
		})
	})

	// Before making a request print "Visiting ..."
	c.OnRequest(func(r *colly.Request) {
		fmt.Println("Visiting", r.URL.String())
	})

	// Start scraping on https://hackerspaces.org
	c.Visit(url)
}
