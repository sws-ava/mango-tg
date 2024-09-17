import { defineStore } from 'pinia'
import type {IBlock, IBlocks} from "@/models/blocks/blocks";

export const useBlocksStore = defineStore('blocksStore', {

  state: (): IBlocks => {
    return {
      blocks:  [] as IBlock[],
    }
  },

  actions: {
    setBlocks(newBlocks: IBlock[]){
      this.clearBlocks()
      this.blocks = newBlocks
    },
    clearBlocks(){
      this.blocks = []
    }
  },
})

