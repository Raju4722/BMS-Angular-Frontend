import { createReducer, on } from "@ngrx/store";
import { LocationState } from "./location.model";
import { setLocation } from "./location.actions";

export const initialstate: LocationState={
    city:'Chittoor'
}

export const locationreducer=createReducer(
    initialstate,
    on(setLocation,(state,{city})=>({
        ...state,
        city
    }))
)