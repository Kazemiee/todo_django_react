from rest_framework import serializers
from .models import Task, TaskOrdering


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('id', 'text', 'difficulty', 'completed')


class TaskOrderingSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskOrdering
        fields = ('first_id', 'second_id')
