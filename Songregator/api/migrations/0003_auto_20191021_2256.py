# Generated by Django 2.2.6 on 2019-10-21 22:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20191017_2027'),
    ]

    operations = [
        migrations.CreateModel(
            name='Artist',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('artist_familiarity', models.FloatField()),
                ('artist_hotttnesss', models.FloatField()),
                ('artist_id', models.CharField(max_length=80)),
                ('artist_latitude', models.FloatField()),
                ('artist_location', models.IntegerField()),
                ('artist_longitude', models.FloatField()),
                ('artist_name', models.CharField(max_length=270, unique=True)),
                ('artist_similar', models.FloatField()),
                ('artist_terms', models.CharField(max_length=80)),
                ('artist_terms_freq', models.FloatField()),
            ],
        ),
        migrations.RemoveField(
            model_name='song',
            name='id',
        ),
        migrations.AlterField(
            model_name='song',
            name='song_id',
            field=models.CharField(max_length=80, primary_key=True, serialize=False),
        ),
    ]
