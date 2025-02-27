from django.db import models

# Create your models here.


class Task(models.Model):
    text = models.CharField(max_length=200)
    difficulty = models.IntegerField()
    completed = models.BooleanField()

    def __str__(self):
        return self.text


class TaskOrdering(models.Model):
    # Deletes reservation if user account is deleted
    first_task = models.ForeignKey(
        Task, on_delete=models.CASCADE, related_name='first')
    second_task = models.ForeignKey(
        Task, on_delete=models.CASCADE, related_name='second')

    def __str__(self):
        return f"{self.first_task} -> {self.second_task}"
