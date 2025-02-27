from rest_framework import serializers
from .models import Task, TaskOrdering


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('id', 'text', 'difficulty')


class TaskOrderingSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskOrdering
        fields = ('first_task', 'second_task')
