<script setup lang="ts">
  import { Form } from 'vee-validate';
  import { ref, useTemplateRef } from 'vue';
  import { apiLogin } from '@/apis/auth';

  const user = ref<{
    email: string;
    password: string;
  }>({
    email: '',
    password: '',
  });
  const formRef = useTemplateRef<InstanceType<typeof Form>>('formRef');

  async function login() {
    try {
      const res = await apiLogin(user.value);
      console.log(res);
      formRef.value?.resetForm();
      alert('登入成功');
    } catch (err) {
      console.log(err);
      alert('登入失敗，請重新登入');
    }
  }
</script>

<template>
  <main
    class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4"
  >
    <div class="w-full max-w-md">
      <div class="bg-white rounded-2xl shadow-xl p-8 md:p-10">
        <div class="text-center mb-8">
          <div
            class="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-log-in w-8 h-8 text-white"
              aria-hidden="true"
            >
              <path d="m10 17 5-5-5-5"></path>
              <path d="M15 12H3"></path>
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
            </svg>
          </div>
          <h1 class="text-gray-900 mb-2">歡迎回來</h1>
          <p class="text-gray-600">請登入您的帳號以繼續</p>
        </div>

        <VForm class="space-y-6" v-slot="{ errors, meta }" @submit="login" ref="formRef">
          <div>
            <label for="email" class="block text-gray-700 mb-2">電子郵件</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-mail h-5 w-5 text-gray-400"
                  aria-hidden="true"
                >
                  <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                  <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                </svg>
              </div>
              <VField
                name="電子信箱"
                id="email"
                type="email"
                class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                :class="{
                  'border-red-500': errors['電子信箱'],
                }"
                placeholder="your@email.com"
                rules="email|required"
                v-model="user.email"
                required
              />
            </div>
            <ErrorMessage name="電子信箱" class="text-red-500 text-sm mt-1" />
          </div>
          <div>
            <label for="password" class="block text-gray-700 mb-2">密碼</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-lock h-5 w-5 text-gray-400"
                  aria-hidden="true"
                >
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <VField
                name="密碼"
                id="password"
                type="password"
                class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                :class="{
                  'border-red-500': errors['密碼'],
                }"
                placeholder="••••••••"
                rules="required"
                v-model="user.password"
                required
              />
            </div>
            <ErrorMessage name="密碼" class="text-red-500 text-sm mt-1" />
          </div>
          <div class="flex items-center justify-between">
            <label class="flex items-center">
              <input
                type="checkbox"
                class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span class="ml-2 text-gray-700">記住我</span>
            </label>
            <a href="#" class="text-indigo-600 hover:text-indigo-700">忘記密碼？</a>
          </div>
          <button
            type="submit"
            class="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition duration-200 flex items-center justify-center gap-2"
            :class="{ 'opacity-50 cursor-not-allowed': !meta.valid }"
            :disabled="!meta.valid"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-log-in w-5 h-5"
              aria-hidden="true"
            >
              <path d="m10 17 5-5-5-5"></path>
              <path d="M15 12H3"></path>
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
            </svg>
            登入
          </button>
        </VForm>
        <div class="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p class="text-blue-800 text-center">💡 提示：輸入任意電子郵件和密碼即可登入</p>
        </div>
      </div>
      <p class="text-center mt-6 text-gray-600">
        還沒有帳號？
        <RouterLink to="/signup" class="text-indigo-600 hover:text-indigo-700">立即註冊</RouterLink>
      </p>
    </div>
  </main>
</template>
