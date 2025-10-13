<template>
    <div class="bg-white rounded-lg shadow-sm py-10 w-full flex">

        <div class="justify-center me-3">
            <slot name="logo" />
        </div>

        <div class="flex flex-col">
            <h1 class="text-sm font-semibold text-gray-700">
                <slot name="title" />
            </h1>
            <p class="text-4xl font-bold text-black leading-tight">
                <slot name="number" />
            </p>
        </div>

    </div>
</template>
