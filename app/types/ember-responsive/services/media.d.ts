import type Service from '@ember/service';
import type Evented from '@ember/object/evented';

type MediaService = Service &
  Evented & {
    [key: string]: boolean | undefined;
  };

export default MediaService;
