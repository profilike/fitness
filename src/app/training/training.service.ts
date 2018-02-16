import { Subject } from 'rxjs/Subject';
import { Exercise } from "./exercise.model";

export class TrainingService{

    exerciseChanged = new Subject<Exercise>()

   private availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
   ]; 
   private runningExecise: Exercise
   private exercices: Exercise[] = []

   getAvailableExercises(){
       return this.availableExercises.slice();
   }
   startExercise( selectedId: string ) {
    this.runningExecise = this.availableExercises.find(ex => ex.id === selectedId)
    this.exerciseChanged.next({...this.runningExecise})
   }

   completeExercise(){
    this.exercices.push({
        ...this.runningExecise, 
        date: new Date(),
        state: 'completed'
    })
    this.runningExecise = null;
    this.exerciseChanged.next(null);
   }
   cancelExercise(progress: number){
    this.exercices.push({
        ...this.runningExecise,
        duration: this.runningExecise.duration * (progress / 100),
        calories: this.runningExecise.calories * (progress / 100),
        date: new Date(),
        state: 'cancelled'
    })
    this.runningExecise = null;
    this.exerciseChanged.next(null)
   }

   getRunningExercise(){
       return {...this.runningExecise}
   }
   getComletedOrCancelledExercises() {
       return this.exercices.slice()
   }
}