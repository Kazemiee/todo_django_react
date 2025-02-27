from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TaskSerializer
from .models import Task, TaskOrdering
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Task, TaskOrdering
from .serializers import TaskSerializer, TaskOrderingSerializer
from rest_framework.decorators import action, api_view

# Create your views here.


class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()


class OrderingView(viewsets.ModelViewSet):
    serializer_class = TaskOrderingSerializer
    queryset = TaskOrdering.objects.all()


def next_task(request):
    tasks = Task.objects.exclude(
        id__in=TaskOrdering.objects.values_list('second_task')
    )

    output_task = tasks.order_by('difficulty').first()
    if output_task:
        return JsonResponse({
            "id": output_task.id,
            "text": output_task.text,
            "difficulty": output_task.difficulty,
        })
    else:
        return JsonResponse({"error": "No available tasks"}, status=404)


def potential_prerequisites(self, task_id):
    exclude = {task_id}
    temp_exclude = [task_id]
    iteration = 0
    print(f"Excluding {task_id} on iteration {iteration}")
    while temp_exclude:
        iteration += 1
        current = temp_exclude.pop()
        print(
            f"Popped: {current}")
        failed_candidates = TaskOrdering.objects.filter(
            first_task_id=current)

        print(
            f"Failed Candidates {failed_candidates} on iteration {iteration}")

        for item in failed_candidates:
            if item.second_task_id not in exclude:
                exclude.add(item.second_task_id)
                temp_exclude.append(item.second_task_id)
                print(
                    f"Excluding {item.first_task_id} on iteration {iteration}")

    potential_tasks = Task.objects.exclude(id__in=exclude)
    potential_tasks_data = list(potential_tasks.values('id', 'text'))
    print(f"Potential Tasks: {potential_tasks_data}")
    return JsonResponse({'potential_prerequisites': potential_tasks_data})
