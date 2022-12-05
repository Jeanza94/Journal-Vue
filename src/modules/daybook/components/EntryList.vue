
<template>
    <div class="entry-list-container">
        <div class="px-2 pt-2">
            <input 
                type="text" 
                class="form-control" 
                placeholder="Buscar entrada"
            />
        </div>

        <div class="entry-scrollarea">
            <h2 
                v-for="item in 100" 
                :key="item">
                <EntryTitle />
            </h2>
        </div>
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
export default {
    components: {
        EntryTitle: defineAsyncComponent(() => import(/* webpackChunkName:"entrytitle-daybook" */ './EntryTitle.vue'))
    }
}
</script>

<style lang="scss" scoped>

    .entry-list-container {
        border-right: 1px solid #2c3e50;
        height: calc(100vh - 56px);
    }

    .entry-scrollarea {
        height: calc(100vh - 110px);
        overflow: scroll;
    }
</style>