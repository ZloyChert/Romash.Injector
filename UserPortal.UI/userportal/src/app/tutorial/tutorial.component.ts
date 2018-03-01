import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.css']
})
export class TutorialComponent implements OnInit {

  instruction: string;

  constructor() { }

  ngOnInit() {
    // tslint:disable-next-line:max-line-length
    this.instruction = 'Some very big text. “The Witcher” is a famous series of fantasy short stories written by polish writer Andrzej Sapkowski. The Witcher series includes two books: “Sword of Destiny” and “The Last Wish”, and five novels: “Blood of Elves”, “Time of Contempt”, “Baptism of Fire”, “The Swallow’s Tower” and “Lady of the Lake”. The Witcher and novels have been translated into several languages, including English. The first five books have official English translations and the last two have only fan translations. Official translations of both are expected in several years. Both short stories and novels are considered to be blockbusters of Polish fantasy and are praised for their slightly ironic sense of humor and subtle links to modern culture. This series of books is praised to be one of the best fantasy-saga for the whole existence of this genre. It’s an original epic work which is at the same time free from outer influence and connected with classical mythological, legendary and tale tradition. Unusual beautiful and savage world of literary legend, full of gnomes, elfs, werewolves, vampires, hobbits, dragons, monsters and first of all people, comes alive before the reader. The mail character of the series is Geralt, the witcher itself. He is a monster hunter. When he was a child, he was given to witchers who “endowed” him with supernatural abilities by means of hard training and body modification. His sole purpose is to destroy the monsters that threaten the world and people. He is known under the names: Gwynbleidd - "White Wolf", white-haired witcher and also as Butcher of Blaviken. He has been done his work for a long time until he met a young girl Cirilla. But at the end of the intrigues Geralt becomes involved in the epicenter of confrontation of Northern Kingdoms and powerful South Nilfgaard Empire. He tries to safe young Ciri, the princess of destroyed by nilfgaards Cintra Kingdom, from both of the opponents as they have their own plans for her. At the same time he tries to gain understanding in his relationship with Yennefer, as feeling of both can’t survive “government interests” and “lofty aims”. Every short story and separate novel represents a little episode full of adventures of the Geralt’s life. Along narrating the author reveals to the reader the hero’s rich inner world: his stand in life, his principles and his love. Join Geralt as he battles monsters, demons and prejudices alike. '; }

}
