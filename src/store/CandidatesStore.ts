import { makeAutoObservable } from 'mobx';

import { dataArray } from './constants';
import { IСandidate } from './types';

export class CandidatesStore {
  candidatesArray: IСandidate[] = dataArray;

  constructor() {
    makeAutoObservable(this);
  }

  addCandidate(candidate: IСandidate) {
    this.candidatesArray.push(candidate);
  }

  deleteCandidate(id: string) {
    this.candidatesArray = this.candidatesArray.filter((candidate) => candidate.id !== id);
  }

  editCandidate(id: string, candidate: IСandidate) {
    this.candidatesArray = this.candidatesArray.map((item) => (item.id === id ? candidate : item));
  }
}
