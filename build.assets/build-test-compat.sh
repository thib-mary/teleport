#!/usr/bin/env bash
#
# /*
# Copyright 2022 Gravitational, Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
# */
#

# This script runs Teleport binaries using different Docker OS images
# to ensure compatibility. It mainly checks for missing library symbols,
# not shared libraries not installed by default in different OSes
# and ensure that Glibc version is sufficient.

DISTROS=(
  "ubuntu:14.04"
  "ubuntu:16.04"
  "ubuntu:18.04"
  "ubuntu:20.04"
  "ubuntu:22.04"
  "centos:7"
  "centos:8"
  "debian:8"
  "debian:9"
  "debian:10"
  "debian:11"
  "debian:12"
  # Distroless Debian fails because of missing libgcc_s.so.1
  # https://github.com/gravitational/teleport/issues/14538
  #"gcr.io/distroless/base-debian12"
  "gcr.io/distroless/cc-debian11"
  "gcr.io/distroless/cc-debian12"
  "amazonlinux:1"
  "amazonlinux:2"
  "amazonlinux:2023"
  "archlinux"
  "oraclelinux:7"
  "oraclelinux:8"
  "oraclelinux:9"
  "fedora:34"
  "fedora:latest"
)

# Global variable to propagate error code from all commands.
# It will be set to non-zero value if any of run commands returns an error.
EXIT_CODE=0

# Run binary in a Docker container and propagate returned exit code. 
#
# This will sometimes run under Google Cloud Build, which implies using Docker-
# out-of-Docker to interact with containers. This means that simply mounting
# the test targest into the test container won't work, as it would require
# knowledge of (and control over) the build container that we just don't have.
#
# In order to have a solution that works on both GCB and on a developer desktop,
# we instead jump through a lot of hoops that `docker run` normally takes care 
# of (like manually creating the container, copying the test targets into it, 
# manually starting it, etc). 
#
# Arguments:
# $1    - distro name
# $2    - binary to run
# $3... - arguments to binary
function run_docker {
  distro=$1
  binary=$(basename $2)

  container=$(docker create $distro /tmp/$binary "${@:3}")
  # I *want* the variable below expanded now, so disabling lint
  # shellcheck disable=SC2064
  trap "docker rm $container > /dev/null" RETURN

  docker cp $2 $container:/tmp/$binary
  docker start $container > /dev/null
  test_result=$(docker wait $container)

  EXIT_CODE=$((EXIT_CODE || test_result))
  if [ $test_result -ne 0 ]
  then
    echo "$binary failed on $distro:"
    docker logs $container
  fi

  return $test_result
}

for DISTRO in "${DISTROS[@]}";
do
  echo "============ Checking ${DISTRO} ============"
  docker pull "${DISTRO}"

  run_docker "$DISTRO" $PWD/build/teleport version
  run_docker "$DISTRO" $PWD/build/tsh version
  run_docker "$DISTRO" $PWD/build/tctl version
  run_docker "$DISTRO" $PWD/build/tbot version
done

exit $EXIT_CODE
