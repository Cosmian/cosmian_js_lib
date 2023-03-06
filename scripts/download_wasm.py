# -*- coding: utf-8 -*-
import urllib.request
import shutil
import ssl
import zipfile

from os import path, remove, getenv


def files_to_be_copied(name: str):
    source_dir = f'tmp/wasm32-unknown-unknown/{name}'
    return {
        f'{source_dir}/cloudproof_{name}.d.ts': f'src/pkg/{name}/cloudproof_{name}.d.ts',
        f'{source_dir}/cloudproof_{name}_bg.wasm': f'src/pkg/{name}/cloudproof_{name}_bg.wasm',
        f'{source_dir}/cloudproof_{name}.js': f'src/pkg/{name}/cloudproof_{name}.js',
        f'{source_dir}/cloudproof_{name}_bg.wasm.d.ts': f'src/pkg/{name}/cloudproof_{name}_bg.wasm.d.ts',
    }


def download_wasm(version: str) -> bool:
    """Download and extract wasm"""
    ssl._create_default_https_context = ssl._create_unverified_context

    to_be_copied = files_to_be_copied('findex')
    cover_crypt_files = files_to_be_copied('cover_crypt')
    to_be_copied.update(cover_crypt_files)

    missing_files = False
    for key, value in to_be_copied.items():
        if not path.exists(value):
            missing_files = True
            break

    if missing_files:
        print(
            f'Missing cloudproof_rust WASM. \
                Copy cloudproof_rust {version} to src/pkg...'
        )

        url = f'https://package.cosmian.com/cloudproof_rust/{version}/wasm.zip'
        try:
            r = urllib.request.urlopen(url)
            if r.getcode() != 200:
                print(f'Cannot get cloudproof_rust {version} ({r.getcode()})')
            else:
                if path.exists('tmp'):
                    shutil.rmtree('tmp')
                if path.exists('wasm.zip'):
                    remove('wasm.zip')

                open('wasm.zip', 'wb').write(r.read())
                with zipfile.ZipFile('wasm.zip', 'r') as zip_ref:
                    zip_ref.extractall('tmp')
                    for key, value in to_be_copied.items():
                        shutil.copyfile(key, value)

                    shutil.rmtree('tmp')
                remove('wasm.zip')
        # pylint: disable=broad-except
        except Exception as exception:
            print(f'Cannot get cloudproof_rust {version} ({exception})')
            return False
    return True


if __name__ == '__main__':
    ret = download_wasm('v1.0.0')
    if ret is False and getenv('GITHUB_ACTIONS'):
        download_wasm('last_build')
