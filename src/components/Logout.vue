<template>
    <a
        class="cursor-pointer nav-link"
        @click="logout"
    >
        {{ t('logout.title') }}
    </a>
</template>

<script setup lang="ts">
import {useUserSession} from "@/store/userSession";
import {useI18n} from "vue-i18n";
import {useRouter} from "vue-router";

const { t } = useI18n()
const userSession = useUserSession();
const router = useRouter()

const logout = async () => {
    const response = await ApiSystemServices.logout({}, {})
    if(response.data === "logged_out"){
        userSession.setToken('');
        userSession.setUser('');

        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('locales')

        await router.push({ name: 'Main' });
    }
}

</script>