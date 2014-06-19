/*
Copyright (c) Microsoft Open Technologies, Inc.
All Rights Reserved
Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the
License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, EITHER EXPRESS OR IMPLIED,
INCLUDING WITHOUT LIMITATION ANY IMPLIED WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache 2 License for the specific language governing permissions and limitations under the License.
*/

package com.msopentech.thali.utilities.java;

import com.msopentech.thali.utilities.universal.*;
import org.apache.http.client.HttpClient;
import org.ektorp.http.StdHttpClient;

import java.net.*;
import java.security.*;

public class JavaEktorpCreateClientBuilder extends CreateClientBuilder {
    @Override
    public org.ektorp.http.HttpClient CreateEktorpClient(String host, int port, PublicKey serverPublicKey,
                                                         KeyStore clientKeyStore, char[] clientKeyStorePassPhrase,
                                                         Proxy proxy)
            throws UnrecoverableKeyException, NoSuchAlgorithmException, KeyStoreException, KeyManagementException {
        return new StdHttpClient(CreateApacheClient(host, port, serverPublicKey, clientKeyStore,
                clientKeyStorePassPhrase, proxy));
    }
}
