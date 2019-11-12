
import * as assert from 'assert';
import { mock, when, instance } from 'ts-mockito';
import { DockerAppImageProvider } from './DockerAppImageProvider';
import { Command, ICommand } from '../command/Command';
import { DockerAppImage } from './DockerAppImage';

suite('Docker App Image Lifecycle', () => {
  test('should return all the application images', async () => {
    const mockCommand: ICommand = mock(Command);
    when(mockCommand.execute('docker app image ls')).thenResolve(`REPOSITORY           TAG    APP IMAGE ID APP NAME    CREATED
rumpl/docker-app-elk 2.0.0  3362b67cdc4e app-elk
rumpl/wordpress      1.0.0  3994df978068 wordpress
`);

    const command = instance(mockCommand);

    const sut = new DockerAppImageProvider(command);
    const expected = [
      new DockerAppImage('rumpl/docker-app-elk:2.0.0'),
      new DockerAppImage('rumpl/wordpress:1.0.0'),
    ];
    const result = await sut.getChildren();
    assert.deepEqual(result, expected);
  });
});
