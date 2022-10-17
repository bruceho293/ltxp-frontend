import json
import math
import random
import time

def str_rand_time(start, end, time_format='%Y-%m-%dT%H:%M:%SZ'):
  start = time.mktime(time.strptime(start, time_format))
  end = time.mktime(time.strptime(end, time_format))

  rand_time = start + random.random() * (end - start)
  return time.strftime(time_format, time.localtime(rand_time))

if __name__ == '__main__':
  data = list()
  qnty = 50
  max_price = 500
  min_price = 100
  max_diff_price = 100
  min_diff_price = -100
  name = 'HP 15 -XONSHDJS HD Laptop'

  start_time = '2020-01-01T00:00:01Z'
  end_time = '2022-10-10T22:59:59Z'

  for i in range(qnty):
    record = dict()
    record['id'] = i
    record['name'] = '{} {}'.format(name, i)
    record['cost'] = random.randint(min_price, max_price)
    record['costDiff'] = random.randint(min_diff_price, max_diff_price)
    record['likes'] = random.randint(1, 10)
    record['dislikes'] = random.randint(1, 10)
    record['imp'] = random.randint(0, 1)
    record['updated'] = str_rand_time(start_time, end_time)

    data.append(record)

  with open('mock-laptop-data.json', 'w+', encoding='utf-8') as file:
    data_json = json.dumps(data, indent=2)
    file.write(data_json)


  