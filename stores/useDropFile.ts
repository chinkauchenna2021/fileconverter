import { AnyComponent } from 'styled-components/dist/types'
import { create } from 'zustand'
import { persist} from 'zustand/middleware'

interface State {
    droppedFiles:FileList[]
    updateDroppedFile:(file:any[])=>void
}

export const useDropFile = create<State>((set)=>({
       droppedFiles:[],
       updateDroppedFile:(file:any[])=>{
         set((state: any) => ({ droppedFiles: Array.from(new Set([...state.droppedFiles, ...file]))}))
    }
}));

