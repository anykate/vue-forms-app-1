<script setup>
import { ref, onMounted } from 'vue'

const tasksModel = ref({
	tasks: [],
	editing: null,
})

const createTask = (data, form$) => {
	addToStorage(form$.data)
	syncFromStorage()
	form$.reset()
}

const syncFromStorage = () => {
	let tasks = localStorage.getItem('tasks')

	tasksModel.value = {
		tasks: tasks ? JSON.parse(tasks) : [],
	}
}

const syncToStorage = () => {
	localStorage.setItem('tasks', JSON.stringify(tasksModel.value.tasks))
}

const addToStorage = (data) => {
	let storageData = localStorage.getItem('tasks')
	storageData = storageData ? JSON.parse(storageData) : []
	storageData.push(data)
	localStorage.setItem('tasks', JSON.stringify(storageData))
}

const edit = (index) => {
	tasksModel.value.editing = index
}

const cancel = () => {
	tasksModel.value.editing = null
	syncFromStorage()
}

const save = () => {
	syncToStorage()
	tasksModel.value.editing = null
}

onMounted(() => {
	syncFromStorage()
})
</script>

<template>
	<div class="max-w-7xl mx-auto">
		<h1 class="text-3xl text-center font-semibold my-4">The Task List</h1>

		<Vueform
			size="lg"
			:endpoint="createTask"
		>
			<TextElement
				name="task"
				placeholder="Add Task"
				floating="Task Name"
				rules="required"
			/>

			<RadiogroupElement
				name="type"
				:items="['Personal', 'Work']"
				view="tabs"
				default="Personal"
			/>

			<ButtonElement
				name="add-task"
				align="right"
				submits
			>
				Add Task
			</ButtonElement>
		</Vueform>

		<hr class="border-b-1 my-8" />

		<Vueform
			v-model="tasksModel"
			sync
		>
			<ListElement
				name="tasks"
				:controls="{
					add: false,
				}"
				:add-class="{
					handle: 'task-sort-handle',
				}"
				sort
				@sort="syncToStorage"
				@remove="syncToStorage"
			>
				<template #default="{ index }">
					<ObjectElement
						:name="index"
						:add-class="[
							'bg-gray-100 p-2',
							tasksModel.tasks[index].type === 'Personal'
								? 'border-l-4 border-green-500'
								: 'border-l-4 border-indigo-500',
						]"
					>
						<ButtonElement
							:label="`#${index + 1} - ${tasksModel.tasks[index].task}`"
							name="edit"
							align="right"
							:conditions="[['editing', '!=', index]]"
							:columns="{
								label: 8,
							}"
							@click="edit(index)"
						>
							Edit
						</ButtonElement>

						<TextElement
							name="task"
							:conditions="[['editing', index]]"
							:columns="6"
						/>

						<RadiogroupElement
							name="type"
							:items="{
								Personal: 'P',
								Work: 'W',
							}"
							:columns="2"
							:conditions="[['editing', index]]"
							view="tabs"
							default="Personal"
						/>

						<ButtonElement
							name="cancel"
							:conditions="[['editing', index]]"
							:columns="2"
							danger
							full
							@click="cancel"
						>
							Cancel
						</ButtonElement>

						<ButtonElement
							name="save"
							:conditions="[['editing', index]]"
							:columns="2"
							full
							@click="save"
						>
							Save
						</ButtonElement>
					</ObjectElement>
				</template>
			</ListElement>
			<HiddenElement name="editing" />
		</Vueform>
	</div>
</template>

<style scoped></style>
