from api.forms import SongForm


def import_csv():
    csv_file_name = '../../music.csv'
    with open(csv_file_name, 'r') as csv_file:
        file_data = csv_file.read()
        lines = file_data.split('\n')[1:-1]  # filter the column names and the last empty row
        for line in lines:
            fields = line.split(',')
            for i in range(len(fields)):
                fields[i] = fields[i].replace('"', '')  # convert isolated values to normal values
            if fields[8] == '':  # fix dataset missing values in the artist_terms row
                fields[8] = 'none'
            song_data = {'artist_familiarity': float(fields[0]), 'artist_hotttnesss': float(fields[1]),
                         'artist_id': fields[2], 'artist_latitude': float(fields[3]), 'artist_location': fields[4],
                         'artist_longitude': float(fields[5]), 'artist_name': fields[6],
                         'artist_similar': float(fields[7]), 'artist_terms': fields[8],
                         'artist_terms_freq': float(fields[9]), 'release_id': fields[10], 'release_name': fields[11],
                         'song_artist_mbtags': float(fields[12]), 'song_artist_mbtags_count': float(fields[13]),
                         'song_bars_confidence': float(fields[14]), 'song_bars_start': float(fields[15]),
                         'song_beats_confidence': float(fields[16]), 'song_beats_start': float(fields[17]),
                         'song_duration': float(fields[18]), 'song_end_of_fade_in': float(fields[19]),
                         'song_hotttnesss': float(fields[20]), 'song_id': fields[21], 'song_key': float(fields[22]),
                         'song_key_confidence': float(fields[23]), 'song_loudness': float(fields[24]),
                         'song_mode': fields[25], 'song_mode_confidence': float(fields[26]),
                         'song_start_of_fade_out': float(fields[27]), 'song_tatums_confidence': float(fields[28]),
                         'song_tatums_start': float(fields[29]), 'song_tempo': float(fields[30]),
                         'song_time_signature': float(fields[31]), 'song_time_signature_confidence': float(fields[32]),
                         'song_title': fields[33], 'song_year': fields[34]}
            try:
                form = SongForm(song_data)
                if form.is_valid():
                    form.save()
                else:
                    print(form.errors.as_json())
            except Exception as e:
                print(repr(e))
                pass
